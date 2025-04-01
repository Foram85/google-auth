This application has 2 pages:

1. http://localhost:3000/auth/register 
-To register with google

2. http://localhost:3000/auth/home
-This route is protected with jwt

Once user registers through google , jwt will be generated and based on the given jwt , he will be able to access home page