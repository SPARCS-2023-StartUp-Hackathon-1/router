from dotenv import load_dotenv
import googlemaps
import os

load_dotenv()
gmaps = googlemaps.Client(key=os.getenv('GOOGLEMAP_API_KEY'))

def aroundSearch(lat, lng, ver="1"):
    try:
        if ver == "1":
            # 거리 이름 버전
            reverse_geocode_result = gmaps.reverse_geocode((lat, lng), language="ko")
            return reverse_geocode_result[0]['formatted_address']
        else:
            # 가까운 장소 버전
            result = gmaps.places_nearby(location=(lat, lng), radius=1000, language="ko")
            names = [result['name'] for result in result['results']]
            return names[0]
    except:
        return ""

if __name__== "__main__":
    print(aroundSearch(48.808813888888885,2.107275))
