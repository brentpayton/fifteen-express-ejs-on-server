from selenium import webdriver
from random_words import RandomWords
rw = RandomWords()
# -----------------------------------------------------------------------------
# TC 132 - Create new poem with pre-existing account
# -----------------------------------------------------------------------------

# Set things up
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
assert "Add a poem" in driver.page_source

# Navigate to the new poem page and create the new poem.
driver.find_element_by_id('addPoem').click()
# driver.find_element_by_id('title') \
#     .send_keys('Test poem from TC 132')

autoPoemTitle = rw.random_word()
autoPoemTitle += ' '
autoPoemTitle += rw.random_word()

driver.find_element_by_id('title') \
    .send_keys(autoPoemTitle)

driver.find_element_by_id('submit').click()
assert "Poem added" in driver.page_source

# Select the just-created poem from the homepage and edit it
# driver.find_element_by_name('Test poem from TC 132').click()
driver.find_element_by_name(autoPoemTitle).click()
driver.find_element_by_id('editPoem').click()

driver.find_element_by_id('l1w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l1w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l1w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l1w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l1w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l2w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l2w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l2w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l2w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l2w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l3w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l3w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l3w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l3w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l3w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l4w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l4w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l4w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l4w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l4w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l5w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l5w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l5w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l5w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l5w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l6w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l6w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l6w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l6w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l6w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l7w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l7w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l7w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l7w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l7w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l8w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l8w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l8w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l8w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l8w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l9w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l9w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l9w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l9w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l9w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l10w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l10w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l10w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l10w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l10w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l11w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l11w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l11w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l11w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l11w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l12w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l12w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l12w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l12w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l12w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l13w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l13w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l13w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l13w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l13w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l14w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l14w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l14w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l14w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l14w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('l15w1') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l15w2') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l15w3') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l15w4') \
    .send_keys(rw.random_word())
driver.find_element_by_id('l15w5') \
    .send_keys(rw.random_word())

driver.find_element_by_id('submit').click()
driver.quit()
