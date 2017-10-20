from selenium import webdriver

# -----------------------------------------------------------------------------
# TC 137 - View details of a poem while logged in as the author
# Edit and hide buttons should be present
# -----------------------------------------------------------------------------

driver = webdriver.Chrome('D:\Dropbox\WebDev\selenium\chromedriver.exe')

driver.set_page_load_timeout(30)
driver.get('https://dev.fifteenlines.com/login')
driver.implicitly_wait(20)
# Log in
driver.find_element_by_name('username') \
    .send_keys('brent')
driver.find_element_by_name('password') \
    .send_keys('password')
driver.find_element_by_id('submit').click()

# Click the first poem on the homepage.
driver.find_element_by_css_selector(
    'body > div:nth-child(3) > div > ' +
    'div:nth-child(1) > div.caption > h4 > a').click()

assert 'editPoem' in driver.page_source
assert 'Poem Visibility' in driver.page_source

driver.quit()
