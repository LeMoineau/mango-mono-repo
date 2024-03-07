from protobuf_inspector.types import StandardParser

parser = StandardParser()
with open("result.txt", 'w', encoding="utf-8") as f:
    with open('allV2', 'rb') as fh:
        print(parser.parse_message(fh, "message"), file=f)
