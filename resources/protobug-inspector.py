from protobuf_inspector.types import StandardParser
import re

ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')

def countSpaceIn(line):
    nbSpace = 0
    for char in line:
        if char != " ":
            return nbSpace
        nbSpace += 1
    return nbSpace

def parse():
    parser = StandardParser()
    with open("result.txt", 'w', encoding="utf-8") as f:
        with open('manga_viewer', 'rb') as fh:
            message = parser.parse_message(fh, "message") 
        lines = message.split("\n")
        f.write(lines[0] + "\n")
        for line in lines[1:]:
            trimLine = ansi_escape.sub('', line)
            f.write(trimLine + "\n")

def identifyLine(line): 
    identifier = line.split(" ")[0]
    typ = "json" if "<chunk> = message" in line else "int" if "<varint>" in line else "string"
    value = ""
    return identifier, typ, value

def parseMessage(lines, currentMessageNbSpace):
    json = {}
    
    for line, index in enumerate(lines):
        if countSpaceIn(line) == currentMessageNbSpace:
            return json
        identifier = line.split(" ")[0]
        json[identifier] = []

    return json


if __name__ == "__main__":  
    parse()