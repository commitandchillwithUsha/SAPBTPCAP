namespace my.school;

entity Students {
key  ID : UUID;
     firstName : String(50);
     lastName : String(100);
     email : String(100);
     age : Integer;
     createdAt : Timestamp;
}

entity Courses {
key  ID : UUID;
     name : String(100);
     credits : Integer;
}