## Institute Registration

```
PUT educy/institute/api/register
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

instituteName:{
  type:String,
  required:true,
  minlength: 10,
  maxlength: 100
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
address:{
  type:String,
  required:true,
  minlength:10,
  maxlength: 100
  pincode:{
          type:Number,
          required: true,
          minlength:6,
          maxlength: 6
              }
}

website:{
  type:String,
  required: true,
  maxlength: 1024
}

```

### Response body
```
Code: 200
          user=new User({
          instituteName:req.body.instituteName,
          email:req.body.email,
          phoneNumber:req.body.phoneNumber,
          address:req.body.address
          website:req.body.website
        });
```
### Error Response
```
1. Code: 404
Content: {error: "Registration failed"}

2. Code: 400
Content: {error: "Credentials invalid"}

3. Code: 400
Content: {error: "Institute already registered"}
```

## Institute Login

### Api
```
GET educy/institute/api/login
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
Content: {error: "Institute not registered"}

2. Code: 400
Content: {error: "Credentials invalid"}

```



