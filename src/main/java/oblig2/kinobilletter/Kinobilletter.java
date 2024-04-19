package oblig2.kinobilletter;

public class Kinobilletter {
        private String film;
        private int antall;
        private String fornavn;
        private String etternavn;
        private String telefonnummer;
        private String email;

        public Kinobilletter(String film, int antall, String fornavn, String etternavn, String telefonnummer, String email) {
            this.film = film;
            this.antall = antall;
            this.fornavn = fornavn;
            this.etternavn = etternavn;
            this.telefonnummer = telefonnummer;
            this.email = email;
        }

        public Kinobilletter(){}


        public String getFilm() {
            return film;
        }

        public void setFilm(String film) {
            this.film = film;
        }

        public int getAntall() {
            return antall;
        }

        public void setAntall(int antall) {
            this.antall = antall;
        }

        public String getFornavn() {
            return fornavn;
        }

        public void setFornavn(String fornavn) {
            this.fornavn = fornavn;
        }

        public String getEtternavn() {
            return etternavn;
        }

        public void setEtternavn(String etternavn) {
            this.etternavn = etternavn;
        }

        public String getTelefonnummer() {
            return telefonnummer;
        }

        public void setTelefonnummer(String telefonnummer) {
            this.telefonnummer = telefonnummer;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }


