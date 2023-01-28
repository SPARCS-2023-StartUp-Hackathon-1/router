from dotenv import load_dotenv
import googlemaps
import os

load_dotenv()
gmaps = googlemaps.Client(key=os.getenv('GOOGLEMAP_API_KEY'))

def aroundSearch(lat, lng):
    try:
        reverse_geocode_result = gmaps.reverse_geocode((lat, lng), language="ko")
        return reverse_geocode_result[0]['formatted_address']
    except:
        return ""

if __name__== "__main__":
    print(aroundSearch(48.808813888888885,2.107275))
