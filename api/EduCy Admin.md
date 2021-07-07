## EduCy Admin Registration

```
PUT educy/educyadmin/api/register
```

### Status

```
200: OK
400: Bad Request
404: Not Found
```

### Request body
```
Code: 200

firstName:{
  type:String,
  required:true,
  maxlength: 15
}
lastName:{
  type:String,
  required:true,
  maxlength: 15
}
email:{
  type:String
  required: true,
}
phoneNumber:{
  type: Number,
  required: true,
  maxlength: 10
}
password:{
   type: String,
   required: true,
   minlength: 6,
   maxlength: 10
}

```

### Response body
```
Code: 200
        user=new User({
          firstName:  req.body.firstName,
          lastName:   req.body.lastName,
          email:      req.body.email,
          phoneNumber:req.body.phoneNumber,
          password:req.body.password
        });
```
### Error Response
```
1. Code: 404
Content: {error: "Registration failed"}

2. Code: 400
Content: {error: "User credentials invalid"}

3. Code: 400
Content: {error: "User already registered"}
```

## Educy Admin Login

### Api
```
GET educy/educyadmin/api/login
```

### Status
```
200: OK
400: Bad Request
404: Not Found
```

### Request body
```
Code: 200

   username:  {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 30
          },
  
   password: {
          type: String,
          required: true,
          minlength: 6,
          maxlength: 10
            }
```

### Response body
```
Code: 200
        user=new User({
          username:req.body.username,
          password:req.body.password
        });
```

### Error Response
```
1. Code: 404
Content: {error: "User not registered"}

2. Code: 400
Content: {error: "User credentials invalid"}

```


