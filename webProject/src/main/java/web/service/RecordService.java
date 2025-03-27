package web.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import web.repository.RecordRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecordService {
    @Autowired
    private RecordRepository recordRepository;
}

