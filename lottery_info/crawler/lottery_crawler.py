# Vietnam Vietlott MEGA 6/45 Lottery Result Crawler
# Python crawler tutorial source: https://beomi.github.io/gb-crawling/posts/2017-01-20-HowToMakeWebCrawler.html
# JSON data storing tutorial: https://opensource.com/article/19/7/save-and-load-data-python-json

# import 'requests', 'beautifulsoup4' module
import requests
from bs4 import BeautifulSoup

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
draw_date = html.select(
    'div.chitietketqua_title > h5 > b:nth-child(2)'
)

# get draw result from the website
draw_result = html.select(
    'div.day_so_ket_qua_v2 > span'
)

for result in draw_result:
    print(result.text)

for date in draw_date:
    print(date.text)