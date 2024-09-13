public class Parser {
    public static double[] parse(String data){
        var elements = data.split("&");
        double[] jsonValues = new double[3];
        try{
            jsonValues[0] = Double.parseDouble(elements[1].substring(2));
            jsonValues[1] = Double.parseDouble(elements[2].substring(2));
            jsonValues[2] = Double.parseDouble(elements[3].substring(2));
            return jsonValues;
        }catch (Exception e){
            return null;
        }
    }
}
