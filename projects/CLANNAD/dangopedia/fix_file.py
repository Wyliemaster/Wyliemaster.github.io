with open("./Dangopedia.txt", "rb") as f:
    file = bytearray(f.read())


    fixed = file.replace(b"\x0d\x0a\x09", b'\r\n')
    

with open ("./fixed", "wb") as f:
    f.write(fixed)