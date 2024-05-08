#!/usr/bin/env python

from typing import Any
import requests
import re

__SMITHS_URL = 'https://volcano.si.edu/volcanolist_countries.cfm'

__A_ELEM_REGEX = re.compile(r"^.*?<a href=\"(.*?)\">.*$")

def get_text() -> str:
    req = requests.get(__SMITHS_URL)
    res = req.text

    return res


def parse_elems(text: str) -> list[Any]:
    print(text)
    hrefs = re.findall(__A_ELEM_REGEX, text)
    print(hrefs)

    return hrefs



def main():
    main_page = get_text()
    hrefs = parse_elems(main_page)

    print(hrefs)



if __name__ == '__main__' :
    main()
