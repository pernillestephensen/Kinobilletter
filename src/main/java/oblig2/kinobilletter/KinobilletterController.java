package oblig2.kinobilletter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

    @RestController
    public class KinobilletterController {
        public final List<Kinobilletter> kinobillettRegister = new ArrayList<>();

        @PostMapping("/lagre")
        public void lagre(Kinobilletter billett){

            kinobillettRegister.add(billett);

        }

        @GetMapping("/hentAlle")
        public List<Kinobilletter> hentAlle(){

            return kinobillettRegister;
        }

        @GetMapping("/slett")
        public void slett(){
            kinobillettRegister.clear();
        }
    }


