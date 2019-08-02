import argparse
import json
import urllib.request


def __get(character: str):
    letter_a = str(character)
    decimal_a = ord(letter_a)
    hex_A = hex(decimal_a)

    request_url = "https://mojikiban.ipa.go.jp/mji/q?UCS=*"
    request_url = request_url.replace('*', hex_A)
    req = urllib.request.Request(request_url)
    with urllib.request.urlopen(req) as res:
        body = json.load(res)

    return body['results'][0]['読み']


PARSER = argparse.ArgumentParser()
PARSER.add_argument('-c', '--charactors',
                    help='Convert charactors', required=True)


if __name__ == '__main__':
    args = PARSER.parse_args()
    charactors = args.charactors

    for c in charactors:
        print(__get(c))
