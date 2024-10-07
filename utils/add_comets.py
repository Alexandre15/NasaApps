import requests
import sqlite3

import requests
import sqlite3

#conn = sqlite3.connect('C:\\Users\\maxta\\Documents\\GitHub\\nasa\\nasa_back\\db.sqlite3')
#cursor = conn.cursor()


def get_commets():
    url = 'https://data.nasa.gov/resource/b67r-rgxc.json'
    response = requests.get(url)
    data = response.json()

    # Definindo os campos de interesse
    fields = [
        'object_name',  
        'p_yr',         
        'moid_au',      
        'w_deg',        
        'ref'
    ]

    commets = []

    for line in data:
        commet = {}
        for field in fields:
            if field in line:
                commet[field] = line[field]
        commets.append(commet)

    return commets

    
       


conn = sqlite3.connect('C:\\Users\\maxta\\Documents\\GitHub\\nasa\\nasa_back\\db.sqlite3')
cursor = conn.cursor()
comets = get_commets()

for comet in comets:
    print(comet['object_name'])
    cursor.execute('''
        INSERT INTO nasa_api_comets (obj_name,p_ir,moid_au,w_deg,ref)
        VALUES (?,?,?,?,?)
    ''', (comet['object_name'],comet['p_yr'],comet['moid_au'],comet['w_deg'],comet['ref']))

    conn.commit()
conn.close()
