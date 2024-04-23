package oblig2.kinobilletter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

    @RestController
    public class KinobilletterController {

        @Autowired
        private KinobilletterRepository rep;

        @PostMapping("/lagre")
        public void lagre(Kinobilletter billett){

            rep.lagreBillett(billett);

        }

        @GetMapping("/hentAlle")
        public List<Kinobilletter> hentAlle(){

            return rep.hentAlle();
        }

        @GetMapping("/hentFilmer")
        public List<Filmer> hentFilmer(){
            return  rep.hentAlleFilmer();
        }

        @GetMapping("/slettEnBillett")
        public void slettEnBillett(int id){
            rep.slettEnBillett(id);
        }

        @GetMapping("/slett")
        public void slett(){
            rep.slettAlle();
        }
    }


