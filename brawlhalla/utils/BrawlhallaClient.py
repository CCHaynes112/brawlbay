from secret_keys import brawl_key
import requests


class BrawlhallaClient:
    def update_user_from_api(id):
        user_data = requests.get(
            "https://api.brawlhalla.com/player/"
            + str(id)
            + "/stats?api_key="
            + brawl_key
        )
        
    
    def create_user_from_api(id):
        pass
