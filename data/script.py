import csv
import os
import sys
from datetime import datetime, timedelta
from math import log10

readfile = open('./BookingRecord.csv', 'r', encoding = 'utf8')
reader = csv.reader(readfile)

def judgeWeekend(theDate):
  if theDate.weekday() == 4 or theDate.weekday() == 5:
    return "weekend"
  elif theDate == datetime(2014, 1, 1) or theDate == datetime(2014, 1, 30) or theDate == datetime(2014, 1, 31):
    return "weekend"
  elif theDate == datetime(2014, 2, 3) or theDate == datetime(2014, 2, 4) or theDate == datetime(2014, 2, 28):
    return "weekend"
  elif theDate == datetime(2014, 4, 4) or theDate == datetime(2014, 6, 2) or theDate == datetime(2014, 9, 8) or theDate == datetime(2014, 10, 10):
    return "weekend"
  elif theDate == datetime(2015, 1, 1) or theDate == datetime(2015, 1, 2) or theDate == datetime(2015, 2, 18) or theDate == datetime(2015, 2, 19):
    return "weekend"
  elif theDate == datetime(2015, 2, 20) or theDate == datetime(2015, 2, 23) or theDate == datetime(2015, 2, 27):
    return "weekend"
  elif theDate.month == 7 or theDate.month == 8:
    return "summer"
  else:
    return "weekday"

modified_data = []
cnt = 0

for row in reader:
  if cnt == 0:
    cnt = cnt + 1
    continue
  hotel_city = row[0]
  checkin = datetime.strptime(row[1], '%Y/%m/%d')
  checkout = datetime.strptime(row[2], '%Y/%m/%d')
  bookedtime = datetime.strptime(row[3], '%Y/%m/%d %p %I:%M:%S')
  quantity = int(row[4])
  total_value = int(row[5])
  age = int(row[6])
  gender = row[7]
  hometown = row[8]
  foreigner = row[9]

  modified_data.append([hotel_city, checkin, checkout, bookedtime, quantity, total_value, age, gender, hometown, foreigner])

returnpath = './out.csv'
writefile = open(returnpath, 'w', newline='')
writer = csv.writer(writefile)

writer.writerow(["City", "Checkin Date", "Checkout Date", "Booked Time", "Quantity", "Amount", "Age", "Gender", "Hometown", "isForeigner", "Nights Stayed", "Days Prior", "Days Prior(modified)", "Age(modified)", "Price(per night)", "Time of day", "Time of week"])

for i in range(len(modified_data)):
  data_row = modified_data[i]
  
  # classify the hotel location
  if data_row[0] == "台南市":
    hotel_location = "tainan"
  elif data_row[0] == "台北市":
    hotel_location = "taipei"
  elif data_row[0] == "桃園縣":
    hotel_location = "taoyuan"
  elif data_row[0] ==  "台中市":
    hotel_location = "taichung"
  elif data_row[0] ==  "臺東縣":
    hotel_location = "taitung"
  elif data_row[0] ==  "花蓮縣":
    hotel_location = "hualien"
  else:
    hotel_location = "err"
  
  # modify date related data
  return_checkin = data_row[1].date()
  return_checkout = data_row[2].date()
  return_bookedtime = data_row[3]
  
  # original data
  return_quantity = data_row[4]
  return_amount = data_row[5]
  return_age = data_row[6]
  
  # male or female
  if data_row[7] == "男":
    return_gender = "male"
  elif data_row[7] == "女":
    return_gender = "female"
  else:
    return_gender = "others"

  # classify hometown
  if data_row[8] in ['台北市', '新竹市', '新竹縣', '基隆市', '桃園縣', '臺北市']:
    return_hometown = "highest"
  elif data_row[8] in ['高雄市', '新北市', '花蓮縣', '宜蘭縣', '台中市', '臺中市']:
    return_hometown = "high"
  elif data_row[8] in ['南投縣', '澎湖縣', '嘉義市', '台南市', '苗栗縣', '嘉義縣', '屏東縣', '臺南市']:
    return_hometown = "low"
  elif data_row[8] in ['連江縣', '彰化縣', '雲林縣', '金門縣', '臺東縣']:
    return_hometown = "lowest"
  elif data_row[8] in ['非台灣地區']:
    return_hometown = "foreign"
  else:
    return_hometown = "others"

  # classify foreigner
  if data_row[9] == "本國":
    return_isForeigner = "no"
  else:
    return_isForeigner = "yes"
  
  # calculate how many nights the custumor stayed
  return_nights = (return_checkout - return_checkin).days

  # calculate how many days they booked in advance
  return_prior = (return_checkin - return_bookedtime.date()).days
  return_prior_modify = "%.4f" % log10(int(return_prior + 1))

  # modify the age
  return_log_age = "%.4f" % log10(return_age + 1)

  # calculate the price per night
  return_price = int(return_amount / (return_quantity * int(return_nights)))

  if return_bookedtime.hour <= 5:
    return_timeofday = "midnight"
  elif return_bookedtime.hour > 5 and return_bookedtime.hour <= 11:
    return_timeofday = "morning"
  elif return_bookedtime.hour > 11 and return_bookedtime.hour <= 17:
    return_timeofday = "afternoon"
  else:
    return_timeofday = "night"

  # judge weekday or weekend
  if (return_nights == 1):
    return_holiday = judgeWeekend(return_checkin)

  else:
    i = 1
    tmp = judgeWeekend(return_checkin)
    mixed = False
    while i < return_nights:
      new = judgeWeekend(return_checkin + timedelta(days=i))
      i = i + 1
      if tmp != new:
        mixed = True
        break
      
    if mixed:
      return_holiday = "mixed"
    else:
      return_holiday = tmp

  writer.writerow([hotel_location, return_checkin, return_checkout, return_bookedtime, return_quantity, return_amount, return_age, return_gender, return_hometown, return_isForeigner, return_nights, return_prior, return_prior_modify, return_log_age, return_price, return_timeofday, return_holiday])