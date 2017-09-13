import csv
import os
import sys
from datetime import datetime

pathProg = 'D:\\HackTSC'
os.chdir(pathProg)

if os.getcwd() != pathProg:
  print("ERROR: The file path is incorrect.")
  sys.exit()

readfile = open(pathProg + '\BookingRecord.csv', 'r', encoding = 'utf8')
reader = csv.reader(readfile)

modified_data = []

for row in reader:
  hotel_city = row[0]
  checkin = datetime.strptime(row[1], '%Y/%m/%d')
  checkout = datetime.strptime(row[2], '%Y/%m/%d')
  quantity = int(row[4])
  total_value = int(row[5])
  age = int(row[6])
  gender = row[7]
  hometown = row[8]
  foreigner = row[9]

  modified_data.append([hotel_city, checkin, checkout, quantity, total_value, age, gender, hometown, foreigner])

returnpath = 'D:\\HackTSC\out.csv'
writefile = open(returnpath, 'w', newline='')
writer = csv.writer(writefile)

writer.writerow(["City", "Checkin Date"])

for i in range(len(modified_data)):
  data_row = modified_data[i]
  if data_row[0] in ['台南市', '桃園縣'] :
    hotel_location = "west"
  elif data_row[0] in ['台北市', '台中市'] :
    hotel_location = "city"
  elif data_row[0] in ['臺東縣', '花蓮縣']:
    hotel_location = "east"
  else:
    hotel_location = "err"
  return_checkin = data_row[1]
  writer.writerow([hotel_location, return_checkin])
