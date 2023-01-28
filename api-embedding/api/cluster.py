import cv2
import numpy as np
from math import radians, cos, sin, asin, sqrt

def dist(lat1, long1, lat2, long2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lat1, long1, lat2, long2 = map(radians, [lat1, long1, lat2, long2])
    # haversine formula 
    dlon = long2 - long1 
    dlat = lat2 - lat1 
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    # Radius of earth in kilometers is 6371
    km = 6371* c
    return km

def diff(time1, time2):
    diff = time2 - time1
    return diff.total_seconds()

def similarityImageHist(img1, img2, method="BHATTACHARYYA"):
    allMethods = ['CORREL', 'CHISQR', 'INTERSECT', 'BHATTACHARYYA', 'EMD']
    assert method in allMethods
    method = allMethods.index(method)
    img1, img2 = np.array(img1), np.array(img2)
    hist1 = cv2.calcHist([cv2.cvtColor(img1, cv2.COLOR_BGR2HSV)], [0, 1], None, [180, 256], [0, 180, 0, 256])
    hist2 = cv2.calcHist([cv2.cvtColor(img2, cv2.COLOR_BGR2HSV)], [0, 1], None, [180, 256], [0, 180, 0, 256])
    cv2.normalize(hist1, hist1, 0, 1, cv2.NORM_MINMAX)
    cv2.normalize(hist2, hist2, 0, 1, cv2.NORM_MINMAX)
    sim = cv2.compareHist(hist1, hist2, method)
    
    if allMethods[method] == "CORREL": return (sim+1.0)/2.0
    if allMethods[method] == "INTERSECT": return sim
    if allMethods[method] == "BHATTACHARYYA": return 1.0-sim
    return sim

def similarityImageFmat(img1, img2):
    img1, img2 = np.array(img1), np.array(img2)
    feature = cv2.ORB_create() # cv2.AKAZE_create(), cv2.KAZE_create()
    _, desc1 = feature.detectAndCompute(img1, None)
    _, desc2 = feature.detectAndCompute(img2, None)

    # Feture matching
    matcher = cv2.BFMatcher_create(cv2.NORM_HAMMING)
    matches = matcher.knnMatch(desc1, desc2, k=2)
    # matches = matcher.match(desc1, desc2)
    # return [[x.distance for x in m] for m in matches]
    # dists = [m.distance for m in matches]
    # dists = sorted(dists, key=lambda x: x)
    # return dists
    # dists = list(filter(lambda x: x <= 300, dists))
    # return len(dists)

    dists = [m[0].distance / m[1].distance for m in matches]
    dists = list(filter(lambda x: x <= 0.8, dists))
    return len(dists)

def similarityImage(img1, img2, method="feture"):
    assert method in ["hist", "feture"]
    if method == "hist":
        return similarityImageHist(img1, img2)
    elif method == "feture":
        return similarityImageFmat(img1, img2)

def maxpooling(vs):
    return np.max(vs, axis=0)

def l1Distance(v1, v2):
    return np.sum(np.abs(v1 - v2))

def similarity(v1, v2):
    return 1 / l1Distance(v1, v2)
