from selenium import webdriver
import csv
# -----------------------------------------------------------------------------
# TC 138 - View details of a poem while logged in as not the author
#
# By default uses the first entry from signup_10.csv from TC 133 for the user
# -----------------------------------------------------------------------------

datafile = 'signup_10.csv'

# Set things up
driver = webdriver.Chrome('D:\Dropbox\WebDev\selenium\chromedriver.exe')
driver.set_page_load_timeout(30)
driver.get('https://dev.fifteenlines.com/login')
driver.implicitly_wait(20)

with open(datafile) as f:
    reader = csv.reader(f)
    row1 = next(reader)
    # print(row1[1])
    # driver.find_element_by_id('login').click
    assert "Log In" in driver.page_source
    driver.find_element_by_id('username') \
        .send_keys(row1[0])
    driver.find_element_by_id('password') \
        .send_keys(row1[2])
    driver.find_element_by_id('submit').click()
    signedInAs = "Signed in as " + row1[0]
    assert signedInAs in driver.page_source

# Click the first poem on the homepage.
driver.find_element_by_css_selector(
    'body > div:nth-child(3) > div > ' +
    'div:nth-child(1) > div.caption > h4 > a').click()

assert 'editPoem' in driver.page_source
assert 'Poem Visibility' not in driver.page_source

driver.quit()
