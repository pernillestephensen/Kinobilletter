package oblig2.kinobilletter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class KinobilletterRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBillett(Kinobilletter innBillett){
        String sql = "INSERT INTO Kinobilletter (film, antall, fornavn, etternavn, telefonnummer, email) " +
                "VALUES(?, ?, ?, ?, ?, ?)";
        db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(), innBillett.getEtternavn(),
                innBillett.getTelefonnummer(), innBillett.getEmail());

    }

    public List<Kinobilletter> hentAlle(){
        String sql = "SELECT * FROM Kinobilletter ORDER BY etternavn ASC";
        List<Kinobilletter> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Kinobilletter.class));
        return alleBilletter;
    }

    public List<Filmer> hentAlleFilmer(){
        String sql = "SELECT * FROM Filmer";
        return db.query(sql,new BeanPropertyRowMapper(Filmer.class));
    }

    public void slettEnBillett(int id) {
        String sql = "DELETE FROM Kinobilletter WHERE id=?";
        db.update(sql,id);
    }
    public void slettAlle(){
        String sql = "DELETE FROM Kinobilletter";
        db.update(sql);
    }






}
