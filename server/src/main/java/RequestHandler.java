import com.fastcgi.FCGIInterface;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.logging.Logger;

public class RequestHandler {

    public String handleRequest() throws IOException {
        FCGIInterface.request.inStream.fill();
        var contentLength = FCGIInterface.request.inStream.available();
        var buffer = ByteBuffer.allocate(contentLength);
        Logger logger = LoggerConfig.getLogger(this.getClass().getName());
        logger.info("Content length: %d".formatted(contentLength));
        logger.info("Content: %s".formatted(Arrays.toString(buffer.array())));
        var readBytes =
                FCGIInterface.request.inStream.read(buffer.array(), 0,
                        contentLength);
        var requestBodyRaw = new byte[readBytes];
        buffer.get(requestBodyRaw);
        buffer.clear();

        return new String(requestBodyRaw, StandardCharsets.UTF_8);


    }
}