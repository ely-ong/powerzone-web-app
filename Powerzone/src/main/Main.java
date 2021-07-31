package main;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class Main extends Application {

    Controller controller = new Controller();

    @Override
    public void start(Stage primaryStage) throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("view/fxml/login.fxml"));
        primaryStage.setTitle("Powerzone Software");
        Scene scene = new Scene(root, 850, 650);

        //converts css url to string for adding to scene
        String css = getClass().getResource("view/style/loginStyle.css").toExternalForm();

        //adds css to scene
        scene.getStylesheets().add(css);

        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
