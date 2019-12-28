# Vietnam Vietlott MEGA 6/45 Lottery Result Crawler
# Python crawler tutorial source: https://beomi.github.io/gb-crawling/posts/2017-01-20-HowToMakeWebCrawler.html
# JSON data storing tutorial: https://opensource.com/article/19/7/save-and-load-data-python-json
# JSON file reading & writing: Reading and Writing JSON to a File in Python
# (https://stackabuse.com/reading-and-writing-json-to-a-file-in-python/)
# Python JSON module documentation: https://docs.python.org/3/library/json.html

# import 'requests', 'beautifulsoup4' module for data crawling
import requests
from bs4 import BeautifulSoup
# import 'json' module for saving data
import json

# HTTP Get request
req = requests.get('https://vietlott.vn/en/trung-thuong/ket-qua-trung-thuong/645')

# get HTML source
html_src = req.text
# print(html_src)

# get HTML header
html_header = req.headers
# print(html_header)

# get HTTP status / 200: 정상
http_stat = req.status_code
# print(http_stat)

# check if HTTP works well (T/F)
http_ok = req.ok
# print(http_ok)

# convert html source to Python object, using BeautifulSoup
html = BeautifulSoup(html_src, 'lxml')

### Select 메소드를 사용해 해당 HTML 요소의 tag 'list'를 불러옴
### list 내 각각의 값은 객체로, .get('property name'), .text 등으로 활용 가능

# get draw date from the website
draw_date_info = html.select(
    'div.chitietketqua_title > h5 > b:nth-child(2)'
)

# get draw result from the website
draw_result_info = html.select(
    'div.day_so_ket_qua_v2 > span'
)

# seperate draw date to year/month/date
draw_date = draw_date_info[0].text.split('/')
draw_date.reverse()
draw_date_yyyymmdd = ''.join(draw_date)
print(draw_date_yyyymmdd)

# make a list of drawn numbers
draw_result = []
for result in draw_result_info:
    draw_result.append(result.text)
# print(draw_result)

# make a dictionary to transfer information to JSON file
draw_info = []
draw_info_obj = {'draw_date': draw_date_yyyymmdd, 'draw_numbers': draw_result}
draw_info.insert(0, draw_info_obj)
print(draw_info)

# with open('draw_record.json') as input_json:
    # get data from existing JSON file
    # previous_data = json.load(input_json)

    # sort data in JSON file

    # check if draw_info == the latest data in JSON file and store the boolean to variable

    # return the boolean above

# open JSON file again, in 'write' mode
with open('draw_record.json', 'w') as output_json:
    # if boolean was true, don't write data
    # else, write data in JSON file
        json.dump(draw_info, output_json)