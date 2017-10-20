from selenium import webdriver

# -----------------------------------------------------------------------------
# TC 136 - View details of a poem while not logged in
#
# Check the logic for displaying the edit and hide buttons when no one is
# logged in
# -----------------------------------------------------------------------------
driver = webdriver.Chrome('D:\Dropbox\WebDev\selenium\chromedriver.exe')
driver.set_page_load_timeout(30)
driver.implicitly_wait(20)
driver.get('https://dev.fifteenlines.com')

# Click the first poem on the homepage.
driver.find_element_by_css_selector(
    'body > div:nth-child(3) > div > ' +
    'div:nth-child(1) > div.caption > h4 > a').click()

assert 'editPoem' not in driver.page_source
assert 'Poem Visibility' not in driver.page_source

# driver.quit()
