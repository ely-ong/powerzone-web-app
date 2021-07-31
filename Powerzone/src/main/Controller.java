package main;

import javafx.event.ActionEvent;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.control.*;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;

public class Controller {

    public TextField tf_username; //username textfield
    public Label label_errorUsername; //username error text
    public PasswordField pf_password; //password field
    public Label label_errorPsword; //password error text
    public Button btn_login;
    public Hyperlink hyperlink_forgotPsword; //link for forgot password
    public Hyperlink hyperlink_register; //link for register account

    //test function for login
    public void testLogin(){

        //stores current window in variable
        Stage currWindow = (Stage) this.btn_login.getScene().getWindow();

        //modify the conditions for login success
        if (!this.tf_username.getText().equals("hello")){
            highlightErrorUsername();
        }

        else{
            removeHighlightUsername();
        }

        if(!this.pf_password.getText().equals("123")){
            highlightErrorPsword();
        }

        else if(this.tf_username.getText().equals("hello") && this.pf_password.getText().equals("123")){
            try {
                testSuccess(currWindow); //opens test page for successful login
            } catch (Exception exception) {
                exception.printStackTrace();
            }
        }

    }

    /**
     * modifies css to highlight username textfield and display error message
     */
    public void highlightErrorUsername(){
        //highlights text field
        this.tf_username.setStyle("-fx-border-color: -fx-red;");

        //displays error message
        this.label_errorUsername.setStyle("-fx-text-fill: -fx-red;");
    }

    /**
     * modifies css to remove highlight and error message
     */
    public void removeHighlightUsername(){
        //removes highlight
        this.tf_username.setStyle("-fx-border-color: -fx-noColor;");

        //hides error message
        this.label_errorUsername.setStyle("-fx-text-fill: -fx-noColor;");
    }

    /**
     * modifies the css to highlight password textfield and display error message
     */
    public void highlightErrorPsword(){
        //highlights text field
        this.pf_password.setStyle("-fx-border-color: -fx-red;");

        //displays error message
        this.label_errorPsword.setStyle("-fx-text-fill: -fx-red;");
    }

    //opens test page for successful login
    public void testSuccess(Stage window) throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("view/fxml/loginSuccess.fxml"));
        window.getScene().setRoot(root);
        window.show();

    }

    //opens test page for for forgot password
    public void testForgot() throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("view/fxml/forgot.fxml"));
        Stage window = (Stage) this.btn_login.getScene().getWindow();

        window.getScene().setRoot(root);
        window.show();
    }

    //opens test page for register account
    public void testRegister() throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("view/fxml/register.fxml"));
        Stage window = (Stage) this.btn_login.getScene().getWindow();

        window.getScene().setRoot(root);
        window.show();
    }

}
