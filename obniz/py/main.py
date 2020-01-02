import asyncio
import sys

from obniz import Obniz


async def onconnect(obniz):
    obniz.display.clear()
    obniz.display.print('Hello World!')

args = sys.argv
obniz_id = args[1]

obniz = Obniz(obniz_id)
obniz.onconnect = onconnect
asyncio.get_event_loop().run_forever()
