import asyncio
import sys

import numpy as np
from obniz import Obniz
from PIL import Image, ImageOps
from PIL.JpegImagePlugin import JpegImageFile


def load_image_for_obniz(path: str) -> JpegImageFile:
    img = Image.open(path)
    img = img.resize((64, 64))
    # グレースケール
    img = img.convert("L")
    # 白黒反転
    img = ImageOps.invert(img)
    # 0, 1 化
    img = img.point(lambda x: 0 if x < 128 else x)
    img = img.point(lambda x: 1 if x >= 128 else x)
    return img


def paste_center_for_obniz(img: JpegImageFile) -> list:
    width = 128
    height = 64

    # obniz ディスプレイに合わせて新しい画像を作成
    blank = Image.new('L', (width, height))
    # 64x64 の画像を中央に貼り付ける
    blank.paste(img, (32, 0))

    # 画像を配列化して一次元化
    blank = np.array(blank).flatten()

    # 128x64=8192(bit) を 1024 byte で表現する
    byte_array = []
    length = len(blank)
    for i in range(0, length, 8):
        b7 = blank[i + 0] << 7
        b6 = blank[i + 1] << 6
        b5 = blank[i + 2] << 5
        b4 = blank[i + 3] << 4
        b3 = blank[i + 4] << 3
        b2 = blank[i + 5] << 2
        b1 = blank[i + 6] << 1
        b0 = blank[i + 7]
        b = b7 + b6 + b5 + b4 + b3 + b2 + b1 + b0

        # numpy.int64 を int に変換して配列に追加する
        byte_array.append(int(b))

    print(len(byte_array))
    return byte_array


async def onconnect(obniz):
    img = load_image_for_obniz('img/kadomatsu.jpg')
    kadomatsu = paste_center_for_obniz(img)

    obniz.display.clear()
    obniz.display.raw(kadomatsu)

args = sys.argv
obniz_id = args[1]

obniz = Obniz(obniz_id)
obniz.onconnect = onconnect
asyncio.get_event_loop().run_forever()
