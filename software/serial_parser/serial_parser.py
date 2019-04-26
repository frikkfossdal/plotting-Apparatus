import serial
import time

# open serial port
s1 = serial.Serial('/dev/cu.usbmodem14201',250000)


# Open g-code file
f1 = open('demo1.gcode','r')

# Wake up grbl
s1.write(("\r\n\r\n").encode())
time.sleep(2)   # Wait for grbl to initialize
s1.flushInput()  # Flush startup text in serial input

#s1.write("G92 X0 Y0 Z0 \n".encode()) #go to machine home


for line in f1:
    l = line.strip()
    print('sending: ' + l)
    s1.write((l + '\n').encode())


    grbl_out = s1.readline() # Wait for grbl response with carriage return
    print(' : ' + grbl_out.strip().decode('utf-8'))
    time.sleep(.1)

# Wait here until grbl is finished to close serial port and file.

input("  Press <Enter> to exit and disable grbl.")

# Close file and serial port
f.close()
s1.close()
