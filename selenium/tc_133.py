from selenium import webdriver
import csv
# -----------------------------------------------------------------------------
# TC 133 - Create N new local accounts.
#
# By default uses randomly-generated account info from signup_10.csv which
# must be in the same directory as this script.  This must be a simple CSV file
# with user ID, email, and password columns.  No headers.
# The default file was obtained from http://www.mockaroo.com/
# All records found in the CSV file will be processed.  To change the number
# of accounts created, simply generate or manipulate a CSV file.
# -----------------------------------------------------------------------------

datafile = 'signup_10.csv'

# Set things up
driver = webdriver.Chrome('D:\Dropbox\WebDev\selenium\chromedriver.exe')
driver.set_page_load_timeout(30)
driver.get('https://dev.fifteenlines.com/register_no_captcha')
driver.implicitly_wait(20)
users = csv.reader(open(datafile, 'r'))

for row in users:
    driver.find_element_by_id('username') \
        .send_keys(row[0])
    driver.find_element_by_id('email') \
        .send_keys(row[1])
    driver.find_element_by_id('password') \
        .send_keys(row[2])
    driver.find_element_by_id('signUp').click()
    assert "Welcome to Fifteenlines" in driver.page_source
    driver.find_element_by_id('logout').click()
    driver.get('https://dev.fifteenlines.com/register_no_captcha')

driver.quit()
