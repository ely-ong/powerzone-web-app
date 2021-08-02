package main;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;

public class Main extends Application {

    //initializes controller
    Controller controller = new Controller();

    //sets scene width and height
    final int SCENE_WIDTH = 850;
    final int SCENE_HEIGHT = 650;

    @Override
    public void start(Stage primaryStage) throws Exception{
        Parent root = FXMLLoader.load(getClass().getResource("view/fxml/login.fxml"));
        primaryStage.setTitle("Powerzone Software");
        primaryStage.setResizable(false);
        Scene scene = new Scene(root, SCENE_WIDTH, SCENE_HEIGHT);

        //converts css url to string for adding to scene
        String css = getClass().getResource("view/style/loginStyle.css").toExternalForm();

        //adds css to scene
        scene.getStylesheets().add(css);

        primaryStage.setScene(scene);
        primaryStage.sizeToScene();

        //sets application icon
        primaryStage.getIcons().add(new Image(getClass().getResourceAsStream("view/images/POWERZONE_LOGO.png")));
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
