import torch
from typing import Tuple

'''
Please do Not change or add any imports. 
'''

# --------------------------------------------------- task1 ----------------------------------------------------------

def findRot_xyz2XYZ(alpha: float, beta: float, gamma: float) -> torch.Tensor:
    '''
    Args:
        alpha, beta, gamma: They are the rotation angles along x, y and z axis respectly.
            Note that they are angles, not radians.
    Return:
        A 3x3 tensor represents the rotation matrix from xyz to XYZ.
    '''
    # Your implementation start here
    
    # I need to convert degrees to radians first since torch trig functions use radians
    alpha_rad = torch.tensor(alpha * torch.pi / 180.0, dtype=torch.float32)
    beta_rad = torch.tensor(beta * torch.pi / 180.0, dtype=torch.float32)
    gamma_rad = torch.tensor(gamma * torch.pi / 180.0, dtype=torch.float32)
    
    # Building rotation matrix for x-axis
    Rx = torch.tensor([
        [1, 0, 0],
        [0, torch.cos(alpha_rad), -torch.sin(alpha_rad)],
        [0, torch.sin(alpha_rad), torch.cos(alpha_rad)]
    ], dtype=torch.float32)
    
    # Building rotation matrix for y-axis
    Ry = torch.tensor([
        [torch.cos(beta_rad), 0, torch.sin(beta_rad)],
        [0, 1, 0],
        [-torch.sin(beta_rad), 0, torch.cos(beta_rad)]
    ], dtype=torch.float32)
    
    # Building rotation matrix for z-axis
    Rz = torch.tensor([
        [torch.cos(gamma_rad), -torch.sin(gamma_rad), 0],
        [torch.sin(gamma_rad), torch.cos(gamma_rad), 0],
        [0, 0, 1]
    ], dtype=torch.float32)
    
    # For intrinsic rotations, I multiply in the order: Rz * Ry * Rx
    # This is because we rotate around moving axes
    rot_xyz2XYZ = torch.matmul(torch.matmul(Rz, Ry), Rx)

    return rot_xyz2XYZ


def findRot_XYZ2xyz(alpha: float, beta: float, gamma: float) -> torch.Tensor:
    '''
    Args:
        alpha, beta, gamma: They are the rotation angles of the 3 step respectly.
            Note that they are angles, not radians.
    Return:
        A 3x3 tensor represents the rotation matrix from XYZ to xyz.
    '''
    # Your implementation start here:
    
    # First I get the forward rotation
    rot_forward = findRot_xyz2XYZ(alpha, beta, gamma)
    
    # For rotation matrices, the inverse equals the transpose (since they're orthogonal)
    rot_XYZ2xyz = torch.transpose(rot_forward, 0, 1)

    return rot_XYZ2xyz

"""
If your implementation requires implementing other functions.
Please implement all the functions you design under here.
But remember the above "findRot_xyz2XYZ()" and "findRot_XYZ2xyz()"
functions are the only 2 function that will be called in task1.py.
"""

# Your functions for task1:



#---------------------------------------------------------------------------------------------------------------------






# --------------------------------------------------- task2 ----------------------------------------------------------

# for the find_corner_img_coord function implementation:
# You are able to use opencv to detect corners in this function, resulting in numpy arrays,
# but you have to convert numpy arrays back to torch.Tensor form.
# (findChessboardCorners, cornerSubPix can be used to find the corners as the image coordinates)
# (drawChessboardCorners can be used to see if you find the true corners) you can see the true corners in the project pdf - figure 2
# Comment out the following three lines to import the useful functions you need:

import numpy as np
from cv2 import TERM_CRITERIA_EPS, TERM_CRITERIA_MAX_ITER, findChessboardCorners, cornerSubPix, drawChessboardCorners


# Helper function to compute projection matrix using DLT
def compute_projection_matrix(img_pts, world_pts):
    """
    So, I'm gonna be using the Direct Linear Transform (DLT) method here to find the projection matrix.
    """
    num_points = img_pts.shape[0]
    A = torch.zeros((2 * num_points, 12), dtype=torch.float32)

    # Building the A matrix row by row
    for i in range(num_points):
        X, Y, Z = world_pts[i]
        x, y = img_pts[i]

        # Actually each point gives us two equations here (one for x, one for y)
        A[2*i] = torch.tensor([X, Y, Z, 1.0, 0, 0, 0, 0, -x*X, -x*Y, -x*Z, -x], dtype=torch.float32)
        A[2*i+1] = torch.tensor([0, 0, 0, 0, X, Y, Z, 1.0, -y*X, -y*Y, -y*Z, -y], dtype=torch.float32)

    # Using SVD to solve the homogeneous system
    _, _, Vt = torch.linalg.svd(A)
    projection_vec = Vt[-1, :]  # Solution is the last row of V^T
    M = projection_vec.reshape(3, 4)

    # I need to normalize by ||m3|| = 1 for the intrinsic equations to work ------ this is imp
    m3_row = M[2, :3]
    norm = torch.norm(m3_row)
    M = M / norm

    return M


def find_corner_img_coord(image: torch.Tensor) -> torch.Tensor:
    '''
    Args: 
        image: Input image of size 3xMxN.
        M is the height of the image.
        N is the width of the image.
        3 is the channel of the image.

    Return:
        A tensor of size 18x2 that represents the 18 checkerboard corners' pixel coordinates. 
        The pixel coordinate is as usually defined such that the top-left corner is (0, 0)
        and the bottom-right corner of the image is (N, M). 
    '''
    # I tried using OpenCV's automatic detection but it didn't work well on this 3D cube
    # So I manually identified the corners from the image
    # The project instructions say "Manually (or design a program)" is allowed
    
    # I organized the corners as:
    # - First 9 points: left face of the cube (3x3 grid)
    # - Next 9 points: right face of the cube (3x3 grid)
    img_coord = torch.tensor([
        # Left face corners (Y-Z plane in world coordinates)
        [816.0, 663.0],  [870.0, 680.0],  [930.0, 702.0],
        [816.0, 742.0],  [873.0, 766.0],  [930.0, 787.0],
        [819.0, 825.0],  [872.0, 844.0],  [931.0, 870.0],

        # Right face corners (X-Z plane in world coordinates)
        [1068.0, 700.0], [1130.0, 681.0], [1190.0, 663.0],
        [1067.0, 786.0], [1129.0, 765.0], [1186.0, 748.0],
        [1067.0, 869.0], [1128.0, 847.0], [1187.0, 826.0],
    ], dtype=torch.float32)

    return img_coord


def find_corner_world_coord(img_coord: torch.Tensor) -> torch.Tensor:
    '''
    You can output the world coord manually or through some algorithms you design.
    Your output should be the same order with img_coord.

    Args: 
        img_coord: The image coordinate of the corners.
        Note that you do not required to use this as input, 
        as long as your output is in the same order with img_coord.

    Return:
        A torch.Tensor of size 18x3 that represents the 18
        (21 detected points minus 3 points on the z axis look at the figure in the documentation carefully)... 
        ...checkerboard corners' pixel coordinates. 
        The world coordinate or each point should be in form of (x, y, z). 
        The axis of the world coordinate system are given in the image.
        The output results should be in milimeters.
    '''
    # Each square on the checkerboard is 10mm
    square_size = 10.0
    
    # I gotta match the ordering from img_coord
    # The 18 corners come from two visible faces, excluding the 3 on the Z-axis
    
    corners_list = []
    
    # Left face (Y-Z plane): X=0, with Y and Z varying
    # I'm organizing these to match how they appear in the image
    # Top row has highest Z (30mm), bottom row has lowest Z (10mm)
    Z_values = [3*square_size, 2*square_size, 1*square_size]  # 30, 20, 10
    Y_values_left = [3*square_size, 2*square_size, 1*square_size]  # 30, 20, 10
    
    for z in Z_values:
        for y in Y_values_left:
            corners_list.append([0.0, y, z])

    # Right face (X-Z plane): Y=0, with X and Z varying
    X_values_right = [1*square_size, 2*square_size, 3*square_size]  # 10, 20, 30
    
    for z in Z_values:
        for x in X_values_right:
            corners_list.append([x, 0.0, z])

    world_coord = torch.tensor(corners_list, dtype=torch.float32)
    
    return world_coord


def find_intrinsic(img_coord: torch.Tensor, world_coord: torch.Tensor) -> Tuple[float, float, float, float]:
    '''
    Use the image coordinates and world coordinates of the 18 point to calculate the intrinsic parameters.

    Args: 
        img_coord: The image coordinate of the 18 corners. This is a 18x2 tensor.
        world_coord: The world coordinate of the 18 corners. This is a 18x3 tensor.

    Returns:
        fx, fy: Focal length. 
        (cx, cy): Principal point of the camera (in pixel coordinate).
    '''
    # I'm using the projection matrix method here
    M = compute_projection_matrix(img_coord, world_coord)

    m1 = M[0, :3]
    m2 = M[1, :3]
    m3 = M[2, :3]

    # Using equations (4) and (5) from the PDF to extract intrinsics
    # ox = m1^T * m3, oy = m2^T * m3
    cx = torch.dot(m1, m3)
    cy = torch.dot(m2, m3)

    # fx = sqrt(m1^T * m1 - ox^2), fy = sqrt(m2^T * m2 - oy^2)
    fx_squared = torch.dot(m1, m1) - cx**2
    fy_squared = torch.dot(m2, m2) - cy**2

    # I'm using clamp to avoid negative values due to numerical errors
    fx = torch.sqrt(torch.clamp(fx_squared, min=1e-9))
    fy = torch.sqrt(torch.clamp(fy_squared, min=1e-9))

    return fx.item(), fy.item(), cx.item(), cy.item()


def find_extrinsic(img_coord: torch.Tensor, world_coord: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
    '''
    Use the image coordinates, world coordinates of the 18 point and the intrinsic
    parameters to calculate the extrinsic parameters.

    Args: 
        img_coord: The image coordinate of the 18 corners. This is a 18x2 tensor.
        world_coord: The world coordinate of the 18 corners. This is a 18x3 tensor.
    Returns:
        R: The rotation matrix of the extrinsic parameters.
            It is a 3x3 tensor.
        T: The translation matrix of the extrinsic parameters.
            It is a 1-dimensional tensor with length of 3.
    '''
    # At first I need the intrinsic parameters
    fx, fy, cx, cy = find_intrinsic(img_coord, world_coord)
    
    M = compute_projection_matrix(img_coord, world_coord)

    # Building the intrinsic matrix K
    K = torch.tensor([
        [fx, 0.0, cx],
        [0.0, fy, cy],
        [0.0, 0.0, 1.0],
    ], dtype=torch.float32)

    # Using the relationship M = K * [R|T] to extract extrinsics
    # So [R|T] = K^(-1) * M
    K_inverse = torch.linalg.inv(K)
    R_and_T = K_inverse @ M

    R = R_and_T[:, :3]
    T = R_and_T[:, 3]

    # I need to enforce that R is a proper rotation matrix (orthonormal with det=1)
    # Using SVD to find the nearest rotation matrix
    U, _, Vt = torch.linalg.svd(R)
    R = U @ Vt
    
    # I'm justt making sure determinant is +1 (not -1, which would be a reflection in this case.)
    if torch.det(R) < 0:
        U[:, -1] *= -1
        R = U @ Vt

    return R, T


"""
If your implementation requires implementing other functions.
Please implement all the functions you design under here.
But remember the above 4 functions are the only ones that will be called in task2.py.
"""

# Your functions for task2:



#---------------------------------------------------------------------------------------------------------------------