--coaching table has no FK

--admin table has FK as coaching_code from caoching table
ALTER table admin 
add CONSTRAINT fk1
FOREIGN key (coaching_code) 
REFERENCES coaching(coaching_code);

--student has FK as coaching_code from coaching tbale 
Alter table student 
add CONSTRAINT fk2
FOREIGN key (coaching_code)
REFERENCES coaching(coaching_code);

--parent has FK as student_username from student table
ALTER table parent 
add CONSTRAINT fk3
FOREIGN key (student_username)
REFERENCES student(username);

--teacher has FK as coaching_code from coaching tbale
alter table teacher
add CONSTRAINT fk4
FOREIGN key (coaching_code)
REFERENCES coaching(coaching_code);

--marks has FK as student_username from student
alter table marks 
add CONSTRAINT fk5
FOREIGN key (student_username)
REFERENCES student(username);

--physics has FK as coaching_code from coaching table
alter table physics
add CONSTRAINT fk6
FOREIGN key (coaching_code)
REFERENCES coaching(coaching_code);

--chemistry has FK as coaching_code from coaching table
alter table chemistry
add CONSTRAINT fk7
FOREIGN key (coaching_code)
REFERENCES coaching(coaching_code);

--mathematics has FK as coaching_code from coaching table
alter table mathematics
add CONSTRAINT fk8
FOREIGN key (coaching_code)
REFERENCES coaching(coaching_code);

--biology has FK as coaching_code from coaching table
alter table biology
add CONSTRAINT fk9
FOREIGN key (coaching_code)
REFERENCES coaching(coaching_code);

