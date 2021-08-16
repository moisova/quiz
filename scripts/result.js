class Result
{
   constructor(text, value)
   {
       this.text = text;
       this.value = value;
   }
 
   Check(value)
   {
       if(this.value <= value)
       {
           return true;
       }
       else
       {
           return false;
       }
   }
}