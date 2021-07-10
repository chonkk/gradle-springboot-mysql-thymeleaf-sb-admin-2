package com.chonkk.app.domain.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {

    public Board findByAuthor(String author);
    public List<Board> findAllByOrderByIdDesc();
    public Board findBoardById(Long id);

}
