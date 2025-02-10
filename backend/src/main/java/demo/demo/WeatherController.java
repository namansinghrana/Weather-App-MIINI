package demo.demo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@ResponseBody
@RequestMapping("/weather")
public class WeatherController {
    @Autowired
    private WeatherService weatherService;

@CrossOrigin(origins = "http://localhost:5173/")
    @GetMapping("/temperature")
    public Map<String, Object> getTemperature() {
        Double temperature = weatherService.getTemperature();
        Map<String, Object> response = new HashMap<>();
        
        if(temperature != null){
            response.put("city", weatherService.getCity());
            response.put("temperature", temperature);
            response.put("unit", "Celsius");
        }else{
            response.put("message", "Temperature data not avialable");
        }

        return response;
    }
    
}
