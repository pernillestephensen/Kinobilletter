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

        @GetMapping("/hentFilmer")
        public List<Filmer> hentFilmer(){
         List<Filmer> filmer = new ArrayList<>();
        filmer.add(new Filmer("Anyone But You"));
        filmer.add(new Filmer("Bukkene Bruse på badeland"));
        filmer.add(new Filmer("Dream Scenario"));
        filmer.add(new Filmer("Konvoi"));
        filmer.add(new Filmer("The Beekeeper"));
        return  filmer;
        }

        @GetMapping("/slett")
        public void slett(){
            kinobillettRegister.clear();
        }
    }


