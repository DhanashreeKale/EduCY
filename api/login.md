## Login for teachers and students

### Api
```
GET educy/api/users
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
Content: {error: "User Doesn't Exist"}

2. Code: 400
Content: {error: "User credentials invalid"}

```

