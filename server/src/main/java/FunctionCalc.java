import java.util.logging.Logger;

public class FunctionCalc {



    Logger logger = LoggerConfig.getLogger(this.getClass().getName());
    private boolean isTriangle(int x, double y, int r) {
        if (x >= 0 && y >= 0 && y <= (-x + r)) {
            return true;
        }else {
            return false;
        }
    }


    private boolean isCircle(int x, double y, int r) {
        if(x >= 0 && y <= 0 && (x * x + y * y <= Math.pow((double) r / 2, 2))){
            return true;
        }
        return false;


    }


    private boolean isRectangle(int x, double y, int r) {
        if(x >= -r && x <= 0 && y >= (double) -r / 2 && y <= 0){
            return true;
        }

        return false;

    }


    public boolean isInTheSpot(int x, double y, int r) {
        if (y > 5 || y < -3) {
            return false;
        }
        if (isCircle(x, y, r) || isTriangle(x, y, r) || isRectangle(x, y, r)) {
            logger.info("Returned true");
            return true;
        }
        logger.warning("Returned false");
        logger.warning("Returned false : x=%d, y=%f, r=%d".formatted( x, y, r));
        return false;
    }


}