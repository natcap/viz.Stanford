from math import cos, sin, atan2, sqrt, pi


def center_geolocation(geolocations):
    """
    Provide a relatively accurate center lat, lon returned as a list pair, given
    a list of list pairs.
    ex: in: geolocations = ((lat1,lon1), (lat2,lon2),)
        out: (center_lat, center_lon)
    """
    x = 0
    y = 0
    z = 0

    for lat, lon in geolocations:
        lat = float(lat) * pi / 180
        lon = float(lon) * pi / 180
        x += cos(lat) * cos(lon)
        y += cos(lat) * sin(lon)
        z += sin(lat)

    x = float(x / len(geolocations))
    y = float(y / len(geolocations))
    z = float(z / len(geolocations))

    return (atan2(z, sqrt(x * x + y * y)) * 180 / pi, atan2(y, x) * 180 / pi)


def center_rect(geolocations):
    """
    Same as above but with four points in the geolocations list
    """
    return center_geolocation([center_geolocation(geolocations[0:2]), center_geolocation(geolocations[2:4])])
