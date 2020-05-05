import unittest, time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.alert import Alert

# Selenium dokumentation: 
# https://selenium-python.readthedocs.io/api.html

flowchart_square = "IlIxhmMyTdSCZV1cxWXFv"
ifnode = "_1lZFkq37vdYP-6J_D044hl"
paranode = "_2PkgzkF4QW7ixfm5l0-Xz9"

def create_many_nodes(self, number):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        for i in range(number):
            print(i)
            new_obj_btn.click()
            all_squares = self.browser.find_elements(By.CLASS_NAME, flowchart_square)
            
            action_chain = ActionChains(self.browser)
            start_node_output_id = "start-nodebox-start"
            start_node_output = self.browser.find_element_by_id(start_node_output_id)
            action_chain.click(start_node_output).perform()
            action_chain.reset_actions()

            action_chain2 = ActionChains(self.browser)
            input_id = all_squares[i].get_attribute("id") + "box-input"
            square_input = self.browser.find_element_by_id(input_id)
            action_chain2.click(square_input).perform()
            action_chain2.reset_actions()

class FlowChartTest(unittest.TestCase):
    
    
    
    def setUp(self):
        self.browser = webdriver.Chrome()
        self.browser.maximize_window()
        self.browser.get("localhost:9000")
        self.assertEqual("Flowchart", self.browser.title)

    """ def test_create_object(self):
        new_object_btn = self.browser.find_element_by_id('newObject')
        workspace = self.browser.find_element_by_id('workspace-root')
        
        new_object_btn.click()

        self.assertTrue( True, "flow-node" in self.browser.find_element_by_id('workspace-root').get_attribute('innerHTML'))
        
    def test_mark_and_demark(self):
        new_object_btn = self.browser.find_element_by_id('newObject')
        workspace = self.browser.find_element_by_id('workspace-root')

        new_object_btn.click()

        time.sleep(0.05)

        square = self.browser.find_element_by_class_name(flowchart_square)
        square.click()
        time.sleep(2)
        self.assertTrue( True, "box-shadow" in self.browser.find_element_by_id('workspace-root').get_attribute('innerHTML'))
        
        time.sleep(0.05)
        workspace.click()
        self.assertTrue( True, "box-shadow" not in self.browser.find_element_by_id('workspace-root').get_attribute('innerHTML'))
        time.sleep(1)


    def test_drag_and_drop_flowchart_square(self):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()

        time.sleep(0.2)
        square = self.browser.find_element_by_class_name(flowchart_square)
        action_chains = ActionChains(self.browser)
        action_chains.drag_and_drop_by_offset(square, 300, 400).perform()
        time.sleep(2)

    
    def test_connecting_different_squares(self):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()
        time.sleep(0.2)
        new_obj_btn.click()

        time.sleep(0.2)
        square = self.browser.find_element_by_class_name(flowchart_square)

        time.sleep(0.2)
        all_squares = self.browser.find_elements(By.CLASS_NAME, flowchart_square)

        time.sleep(0.2)
        action_chain_1 = ActionChains(self.browser)
        action_chain_1.drag_and_drop_by_offset(all_squares[1], 1000, 0).perform()

        action_chain_2 = ActionChains(self.browser)
        output_id = square.get_attribute("id") + "box-output"
        square_output = self.browser.find_element_by_id(output_id)
        action_chain_2.click(square_output).perform()
        action_chain_2.reset_actions()

        time.sleep(0.2)
        action_chain_3 = ActionChains(self.browser)
        input_id = all_squares[1].get_attribute("id") + "box-input"
        square_2_input = self.browser.find_element_by_id(input_id)
        action_chain_3.click(square_2_input).perform()
        action_chain_3.reset_actions()
        
        time.sleep(1)
        
    def test_connecting_to_start(self):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()

        time.sleep(0.2)
        square = self.browser.find_element_by_class_name(flowchart_square)

        time.sleep(0.2)
        action_chain = ActionChains(self.browser)
        start_node_output_id = "start-nodebox-start"
        start_node_output = self.browser.find_element_by_id(start_node_output_id)
        action_chain.click(start_node_output).perform()
        action_chain.reset_actions()

        time.sleep(0.2)
        action_chain_2 = ActionChains(self.browser)
        input_id = square.get_attribute("id") + "box-input"
        square_input = self.browser.find_element_by_id(input_id)
        action_chain_2.click(square_input).perform()
        action_chain_2.reset_actions()
        
        time.sleep(0.2)

    def test_copy_paste_delete_one_node(self):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()

        time.sleep(0.2)
        square = self.browser.find_element_by_class_name(flowchart_square)

        action = ActionChains(self.browser)
        action.click(square)
        action.key_down(Keys.CONTROL).send_keys('c').key_up(Keys.CONTROL).perform()
        action.reset_actions()

        time.sleep(0.2)
        action_2 = ActionChains(self.browser)
        wroot = self.browser.find_element_by_id("workspace-root")
        wroot.click()
        time.sleep(0.5)
        action_2.click(square)
        action_2.key_down(Keys.CONTROL).send_keys('d').key_up(Keys.CONTROL).perform()
        action_2.reset_actions()
        try:
            self.browser.find_element_by_class_name(flowchart_square)
            print("\nDeleting the element did not work.")
        except NoSuchElementException:
            print("\nDeleting the element worked.")

        time.sleep(0.5)
        action_3 = ActionChains(self.browser)
        action_3.move_to_element(wroot).perform()
        action_3.key_down(Keys.CONTROL).send_keys('v').key_up(Keys.CONTROL).perform()
        action_3.reset_actions()
        
        all_squares = self.browser.find_elements(By.CLASS_NAME, flowchart_square)
        self.assertTrue(len(all_squares) > 0)
   
    def test_copy_paste_delete_several_nodes(self):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()
        time.sleep(0.2)
        new_obj_btn.click()

        time.sleep(0.2)
        all_squares = self.browser.find_elements(By.CLASS_NAME, flowchart_square)

        time.sleep(0.2)
        action_chain = ActionChains(self.browser)
        action_chain.drag_and_drop_by_offset(all_squares[1], 500, 0).perform()

        action = ActionChains(self.browser)
        action.key_down(Keys.SHIFT).click(all_squares[0]).click(all_squares[1]).perform()
        time.sleep(0.2)

        action_2 = ActionChains(self.browser)
        action_2.key_down(Keys.CONTROL).send_keys('c').key_up(Keys.CONTROL).perform()

        time.sleep(0.2)
        action_3 = ActionChains(self.browser)
        wroot = self.browser.find_element_by_id("workspace-root")
        wroot.click()
        time.sleep(0.2)
        action_3.key_down(Keys.SHIFT).click(all_squares[0]).click(all_squares[1]).perform()
        action_4 = ActionChains(self.browser)
        action_4.key_down(Keys.CONTROL).send_keys('d').key_up(Keys.CONTROL).perform()

        time.sleep(0.2)
        action_5 = ActionChains(self.browser)
        action_5.move_to_element(wroot).perform()
        action_5.key_down(Keys.CONTROL).send_keys('v').key_up(Keys.CONTROL).perform()

    def test_show_hide_buttons(self):
        showhide_btn = self.browser.find_element_by_id("showhide")
        showhide_btn.click()
        
        time.sleep(0.2)
        toolbox = self.browser.find_element_by_id("toolbox")
        self.assertEqual(toolbox.value_of_css_property("visibility"), "visible")

        time.sleep(0.2)
        showhide_btn.click()
        self.assertEqual(toolbox.value_of_css_property("visibility"), "hidden")

    def test_increase_decrease_buttons(self):
        #sizeDelta should equal the sizeDelta variable in container.js
        sizeDelta = 200
        showhide_btn = self.browser.find_element_by_id("showhide")
        showhide_btn.click()
        wroot = self.browser.find_element_by_id("workspace-root")
        inc_vertical = self.browser.find_element_by_id("increase-vertical")
        dec_vertical = self.browser.find_element_by_id("decrease-vertical")
        inc_horizontal = self.browser.find_element_by_id("increase-horizontal")
        dec_horizontal = self.browser.find_element_by_id("decrease-horizontal")

        #Testing vertical buttons
        time.sleep(0.2)
        heightstr = wroot.value_of_css_property("height")
        self.assertEqual(wroot.value_of_css_property("height"), heightstr)
        heightstr = heightstr.strip("px")
        height = int(heightstr)
        
        inc_vertical.click()
        height += sizeDelta
        inc_vertical.click()
        height += sizeDelta

        time.sleep(0.2)
        compareheight = str(height) + "px"
        self.assertEqual(wroot.value_of_css_property("height"), compareheight)

        dec_vertical.click()
        height -= sizeDelta
        dec_vertical.click()
        height -= sizeDelta
        dec_vertical.click()
        height -= sizeDelta

        time.sleep(0.2)
        compareheight = str(height) + "px"
        self.assertEqual(wroot.value_of_css_property("height"), compareheight)

        #Testing horizontal buttons
        widthstr = wroot.value_of_css_property("width")
        self.assertEqual(wroot.value_of_css_property("width"), widthstr)
        widthstr = widthstr.strip("px")
        width = int(widthstr)
        inc_horizontal.click()
        width += sizeDelta
        inc_horizontal.click()
        width += sizeDelta
        inc_horizontal.click()
        width += sizeDelta
        inc_horizontal.click()
        width += sizeDelta
        
        time.sleep(0.2)
        comparewidth = str(width) + "px"
        self.assertEqual(wroot.value_of_css_property("width"), comparewidth)

        dec_horizontal.click()
        width -= sizeDelta
        dec_horizontal.click()
        width -= sizeDelta

        time.sleep(0.2)
        comparewidth = str(width) + "px"
        self.assertEqual(wroot.value_of_css_property("width"), comparewidth)

    def test_modal(self):
        modal = self.browser.find_element_by_id("modal")
        self.assertEqual(modal.value_of_css_property("display"), "none")

        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()

        time.sleep(0.2)
        square = self.browser.find_element_by_class_name(flowchart_square)
        squareID = square.get_attribute("id")

        square.click()
        square.click()

        #checking if the title matches the flowchart-square id
        self.assertEqual(modal.value_of_css_property("display"), "block")
        IDstring = "ID: " + squareID
        modaltitle = self.browser.find_element_by_id("modalTitle")
        self.assertEqual(modaltitle.text, IDstring)

        #testing the modal functions default values
        modalcontent = self.browser.find_element_by_id("boxtime")
        modal_name = modalcontent.find_element_by_id("name")
        self.assertEqual(modal_name.get_attribute("value"), "")
        node_desc = modalcontent.find_element_by_id("nodeDescriptionBox")
        self.assertEqual(node_desc.get_attribute("value"), "No function yet")
        modal_func_desc = modalcontent.find_element_by_id("functionDefinition")
        self.assertEqual(modal_func_desc.text, "Function: No function assigned")
        modal_version = modalcontent.find_element_by_id("versionNumber")
        self.assertEqual(modal_version.text, "0")
        time.sleep(0.2)

        #testing the create function in the modal
        create_func = self.browser.find_element_by_id("createFunctionButton")
        create_func.click()
        time.sleep(0.2)

        modaltitle = self.browser.find_element_by_id("modalTitle")
        self.assertEqual(modaltitle.text, "Create function")
        modalcontent = self.browser.find_element_by_class_name("modalContent")
        func_name = modalcontent.find_element_by_id("name")
        func_name.click()
        action = ActionChains(self.browser)
        action.send_keys("Test1")
        action.perform()

        func_desc = modalcontent.find_element_by_id("funcdescBox")
        func_desc.click()
        action2 = ActionChains(self.browser)
        action2.key_down(Keys.CONTROL).send_keys('a').key_up(Keys.CONTROL).perform()
        action2.reset_actions()
        action2.key_down(Keys.DELETE).key_up(Keys.DELETE).perform()
        action2.reset_actions()
        action2.send_keys("Function description for func test1")
        action2.perform()

        func_var_name = modalcontent.find_element_by_id("nameInp")
        func_var_name.click()
        action3 = ActionChains(self.browser)
        action3.key_down(Keys.CONTROL).send_keys('a').key_up(Keys.CONTROL).perform()
        action3.reset_actions()
        action3.key_down(Keys.DELETE).key_up(Keys.DELETE).perform()
        action3.reset_actions()
        action3.send_keys("123")
        action3.perform()        

        func_var_value = modalcontent.find_element_by_id("typeInp")
        func_var_value.click()
        action4 = ActionChains(self.browser)
        action4.key_down(Keys.CONTROL).send_keys('a').key_up(Keys.CONTROL).perform()
        action4.reset_actions()
        action4.key_down(Keys.DELETE).key_up(Keys.DELETE).perform()
        action4.reset_actions()
        action4.send_keys("int")
        action4.perform()

        add_var_btn = self.browser.find_element_by_class_name("addModalButton")
        add_var_btn.click()
        time.sleep(0.5)

        func_var_name = modalcontent.find_element_by_id("nameInp")
        func_var_name.click()
        action3 = ActionChains(self.browser)
        action3.key_down(Keys.CONTROL).send_keys('a').key_up(Keys.CONTROL).perform()
        action3.reset_actions()
        action3.key_down(Keys.DELETE).key_up(Keys.DELETE).perform()
        action3.reset_actions()
        action3.send_keys("false")
        action3.perform()        

        func_var_value = modalcontent.find_element_by_id("typeInp")
        func_var_value.click()
        action4 = ActionChains(self.browser)
        action4.key_down(Keys.CONTROL).send_keys('a').key_up(Keys.CONTROL).perform()
        action4.reset_actions()
        action4.key_down(Keys.DELETE).key_up(Keys.DELETE).perform()
        action4.reset_actions()
        action4.send_keys("bool")
        action4.perform()

        add_var_btn.click()
        time.sleep(0.2)
        
        save_func_btn = self.browser.find_element_by_class_name("saveFunctionDefButton")
        save_func_btn.click()
        time.sleep(0.2)

        back_btn = self.browser.find_element_by_id("backModalButton")
        back_btn.click()
        modaltitle = self.browser.find_element_by_id("modalTitle")
        self.assertEqual(modaltitle.text, IDstring)

        #testing modal load function
        load_func_btn = self.browser.find_element_by_id("loadModalButton")
        load_func_btn.click()
        time.sleep(0.2)

        item = self.browser.find_element_by_class_name("loadDropdownItem")
        item.click()
        time.sleep(0.2)

        close_btn = self.browser.find_element_by_id("closeModalButton")
        close_btn.click()
        time.sleep(0.2)

        square2 = self.browser.find_element_by_class_name(flowchart_square)
        square2.click()
        square2.click()
        modal_func_def = self.browser.find_element_by_id("functionDefinition").text
        self.assertEqual(modal_func_def, "Function: Test1")
        time.sleep(0.2)

        #test modal load search function


        create_func = self.browser.find_element_by_id("createFunctionButton")
        create_func.click()
        time.sleep(0.2)

        func_name = modalcontent.find_element_by_id("name")
        func_name.click()
        action6 = ActionChains(self.browser)
        action6.send_keys("Test2")
        action6.perform()
        func_desc = modalcontent.find_element_by_id("funcdescBox")
        func_desc.click()
        action8 = ActionChains(self.browser)
        action8.send_keys("Description for test 2")
        action8.perform()
        time.sleep(0.5)

        save_func_btn = self.browser.find_element_by_class_name("saveFunctionDefButton")
        save_func_btn.click()
        back_btn = self.browser.find_element_by_id("backModalButton")
        back_btn.click()
        time.sleep(0.2)

        create_func = self.browser.find_element_by_id("createFunctionButton")
        create_func.click()
        time.sleep(0.2)

        func_name = modalcontent.find_element_by_id("name")
        func_name.click()
        action7 = ActionChains(self.browser)
        action7.send_keys("Test3")
        action7.perform()
        func_desc = modalcontent.find_element_by_id("funcdescBox")
        func_desc.click()
        action9 = ActionChains(self.browser)
        action9.send_keys("Description for test 3")
        action9.perform()
        time.sleep(0.5)

        save_func_btn = self.browser.find_element_by_class_name("saveFunctionDefButton")
        save_func_btn.click()
        back_btn = self.browser.find_element_by_id("backModalButton")
        back_btn.click()
        time.sleep(0.2)

        load_func_btn.click()
        time.sleep(0.5)

        search_load = self.browser.find_element_by_id('loadFunctionInput')
        search_load.click()
        time.sleep(0.2)
        action5 = ActionChains(self.browser)
        action5.send_keys("Test2")
        action5.perform()
        item = self.browser.find_element_by_class_name("loadDropdownItem")
        item.click()
        time.sleep(0.2)

        close_btn = self.browser.find_element_by_id("closeModalButton")
        close_btn.click()
        time.sleep(0.2)

        square3 = self.browser.find_element_by_class_name(flowchart_square)
        square3.click()
        square3.click()
        time.sleep(0.5)

        modal_func_def = self.browser.find_element_by_id("functionDefinition").text
        self.assertEqual(modal_func_def, "Function: Test2")

        #test function version number buttons
        #save doesn't work yet
    
        #funcVUp = modalcontent.find_element_by_id("functionVersionUp")
        #funcVUp.click()
        #time.sleep(0.2)
        #funcVUp.click()
        #modal_version = modalcontent.find_element_by_id("versionNumber")
        #self.assertEqual(modal_version.text, "2")
        #funcVDown = modalcontent.find_element_by_id("functionVersionDown")
        #funcVDown.click()
        #modal_version = modalcontent.find_element_by_id("versionNumber")
        #self.assertEqual(modal_version.text, "1")
        #time.sleep(0.5)


    def test_click_on_connector(self):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()

        time.sleep(0.2)
        square = self.browser.find_element_by_class_name(flowchart_square)

        time.sleep(0.2)
        action_chain = ActionChains(self.browser)
        start_node_output_id = "start-nodebox-start"
        start_node_output = self.browser.find_element_by_id(start_node_output_id)
        action_chain.click(start_node_output).perform()
        action_chain.reset_actions()

        time.sleep(0.2)
        action_chain_2 = ActionChains(self.browser)
        input_id = square.get_attribute("id") + "box-input"
        square_input = self.browser.find_element_by_id(input_id)
        action_chain_2.click(square_input).perform()
        action_chain_2.reset_actions()
        
        time.sleep(0.2)
        connectorid = square.get_attribute("id") + "start-node"
        connector = self.browser.find_element_by_id(connectorid)
        connector.click()
        style = self.browser.find_element_by_id(connectorid).get_attribute('style')
        self.assertTrue("box-shadow" in style)
        

        time.sleep(0.5)
        wroot = self.browser.find_element_by_id("workspace-root")
        wroot.click()
        style = self.browser.find_element_by_id(connectorid).get_attribute('style')
        self.assertTrue("box-shadow" not in style)
        time.sleep(1)

    def test_remove_connector(self):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()

        time.sleep(0.2)
        square = self.browser.find_element_by_class_name(flowchart_square)

        time.sleep(0.2)
        action_chain = ActionChains(self.browser)
        start_node_output_id = "start-nodebox-start"
        start_node_output = self.browser.find_element_by_id(start_node_output_id)
        action_chain.click(start_node_output).perform()
        action_chain.reset_actions()

        time.sleep(0.2)
        action_chain_2 = ActionChains(self.browser)
        input_id = square.get_attribute("id") + "box-input"
        square_input = self.browser.find_element_by_id(input_id)
        action_chain_2.click(square_input).perform()
        action_chain_2.reset_actions()
        
        time.sleep(0.2)
        connectorid = square.get_attribute("id") + "start-node"
        connector = self.browser.find_element_by_id(connectorid)
        connector.click()
        style = self.browser.find_element_by_id(connectorid).get_attribute('style')
        self.assertTrue("box-shadow" in style)

        time.sleep(0.5)
        action_chain_3 = ActionChains(self.browser)
        action_chain_3.key_down(Keys.CONTROL).send_keys('d').key_up(Keys.CONTROL)
        action_chain_3.perform()

    def test_saving_flow(self):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()
        time.sleep(0.2)
        new_obj_btn.click()

        time.sleep(0.2)
        square = self.browser.find_element_by_class_name(flowchart_square)

        time.sleep(0.2)
        all_squares = self.browser.find_elements(By.CLASS_NAME, flowchart_square)

        time.sleep(0.2)
        action_chain_1 = ActionChains(self.browser)
        action_chain_1.drag_and_drop_by_offset(all_squares[1], 1000, 0).perform()

        action_chain_2 = ActionChains(self.browser)
        output_id = square.get_attribute("id") + "box-output"
        square_output = self.browser.find_element_by_id(output_id)
        action_chain_2.click(square_output).perform()
        action_chain_2.reset_actions()

        time.sleep(0.2)
        action_chain_3 = ActionChains(self.browser)
        input_id = all_squares[1].get_attribute("id") + "box-input"
        square_2_input = self.browser.find_element_by_id(input_id)
        action_chain_3.click(square_2_input).perform()
        action_chain_3.reset_actions()

        time.sleep(0.5)
        action_chain_4 = ActionChains(self.browser)
        action_chain_4 = ActionChains(self.browser)
        start_node_output_id = "start-nodebox-start"
        start_node_output = self.browser.find_element_by_id(start_node_output_id)
        action_chain_4.click(start_node_output).perform()
        action_chain_4.reset_actions()

        time.sleep(0.2)
        action_chain_5 = ActionChains(self.browser)
        input_id = all_squares[0].get_attribute("id") + "box-input"
        square_input = self.browser.find_element_by_id(input_id)
        action_chain_5.click(square_input).perform()
        action_chain_5.reset_actions()
    
        time.sleep(0.5)
        show_hide_btn = self.browser.find_element_by_id("showhide")
        show_hide_btn.click()
        toolbox = self.browser.find_element_by_id("toolbox")
        save_chart_btn = toolbox.find_element_by_id("saveChart")
        save_chart_btn.click()
        time.sleep(0.5)

        save_text_question = Alert(self.browser).text
        self.assertEqual(save_text_question, "Please enter the name for your save file")
        alert = Alert(self.browser)
        alert.send_keys("testsave1")
        time.sleep(0.5)
        alert.accept()

    def test_if_and_parallel_nodes(self):
        new_obj_btn = self.browser.find_element_by_id("newObject")
        new_obj_btn.click()
        new_ifobj_btn = self.browser.find_element_by_id("newIfObject")
        new_ifobj_btn.click()
        new_paraobj_btn = self.browser.find_element_by_id("newParallelObject")
        new_paraobj_btn.click()
        time.sleep(0.2)

        conditional = self.browser.find_element_by_class_name(ifnode)
        action = ActionChains(self.browser)
        action.drag_and_drop_by_offset(conditional, 400, 0).perform()
        parallel = self.browser.find_element_by_class_name(paranode)
        action2 = ActionChains(self.browser)
        action2.drag_and_drop_by_offset(conditional, 800, 0).perform()
        square = self.browser.find_element_by_class_name(flowchart_square)
        
        action_chain = ActionChains(self.browser)
        start_node_output_id = "start-nodebox-start"
        start_node_output = self.browser.find_element_by_id(start_node_output_id)
        action_chain.click(start_node_output).perform()

        time.sleep(0.2)
        action_chain_2 = ActionChains(self.browser)
        input_id = parallel.get_attribute("id") + "box-input"
        parallel_input = self.browser.find_element_by_id(input_id)
        action_chain_2.click(parallel_input).perform()

        wroot = self.browser.find_element_by_id('workspace-root')
        wroot.click()

        action_chain_3 = ActionChains(self.browser)
        output_id = parallel.get_attribute("id") + "box-parallel"
        output = self.browser.find_element_by_id(output_id)
        action_chain_3.click(output).perform()

        time.sleep(0.2)
        action_chain_4 = ActionChains(self.browser)
        input_id_2 = conditional.get_attribute("id") + "box-input"
        conditional_input = self.browser.find_element_by_id(input_id_2)
        action_chain_4.click(conditional_input).perform()

        wroot = self.browser.find_element_by_id('workspace-root')
        wroot.click()
        
        action_chain_5 = ActionChains(self.browser)
        cond_output_id = conditional.get_attribute("id") + "box-outputIf"
        cond_output = self.browser.find_element_by_id(cond_output_id)
        action_chain_5.click(cond_output).perform()

        time.sleep(0.2)
        action_chain_6 = ActionChains(self.browser)
        input_id_3 = square.get_attribute("id") + "box-input"
        square_input = self.browser.find_element_by_id(input_id_3)
        action_chain_6.click(square_input).perform()
        """

    def test_stress_1(self):
        #creates nodes and connects them to the start node, the nodes are stacked on the same spot on the screen/page
        create_many_nodes(self, 304)
        #lagging a bit at 800 quite a lot at 900 nodes
        #100 connected: not lagging at start, with 800 nodes total only 100 connected starting to lag 900 lagging quite a bit
        #200 connected: not lagging at start, drag delay starting at 600 if above the place with a lot of nodes
        #300 connected: feels like it might lag a little while dragging a node above the 299 others, quick load
        #400 connected: feels like it lags above the 399 others, on the other side no lag
        #1000 connected: lagging if dragging near all nodes
        #10000 connected: creation slowing down a lot above 1500, couldn't bother running the whole thing, took about 3 sec 
        # for one creation and connection when above 3000 nodes were on the screen 

        #cors/fetch fails on saving 305 nodes were all of them are only connected to the start node
        #need to check if it fails on saving less nodes with more connections
        
        time.sleep(1000)
        
    



    def tearDown(self):
        self.browser.quit()

if __name__ == '__main__':
    unittest.main(verbosity=2)