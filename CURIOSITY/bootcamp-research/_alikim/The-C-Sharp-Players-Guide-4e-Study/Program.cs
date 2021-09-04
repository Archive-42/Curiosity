using System;

Console.WriteLine("Annyeong! 안녕!!!");
Console.WriteLine("How are you today Ashe?!");
Console.WriteLine("I had a great day! I talked to my classmates and played Stardew with them.");
Console.WriteLine("I read from my new book, and I got some cute lacey black socks.");
Console.WriteLine("oH! I also got a real big micro-SD card for my Switch, 'cuz 32GB is really not enough. I got 215?? GB card?");

// Reading Text from the Console
string name;
name = Console.ReadLine();
Console.WriteLine("Hi " + name);

// Challenge: Consolas and Telim
Console.WriteLine("Bread is ready.");
Console.Write("Who is the bread for? ");
string breadName;
breadName = Console.ReadLine();
Console.WriteLine("Noted: " + breadName + " got bread.");

// -----------------
// Level 4: Comments
// * Comments let you put text in a program that the computer ignores.
// * Make comments by starting with two slashes // or between /* slash-asterisks */.


// Challenge: The Thing Name 3000
// using System;

Console.WriteLine("What kind of thing are we talking about?");
string a = Console.ReadLine(); // noun
Console.WriteLine("How would you describe it? Big? Azure? Tattered?");
string b = Console.ReadLine(); // adjective for noun a
string c = "Doom"; // will be '... of Doom'
string d = "3000"; // will be 'Doom 3000'
Console.WriteLine("The " + b + " " + a + " of " + c + " " + d + "!");

// ------------------
// Level 5: Variables

// Creating and Using Variables in C#
string username;                        // Declaring a variable
username = Console.ReadLine();          // Assigning a value to a variable
Console.WriteLine("Hi " + username);    // Retrieving a variable's current value

string favoriteColor;
favoriteColor = Console.ReadLine();
Console.WriteLine(username + "'s favorite color is " + favoriteColor + ".");

// Integers
int score;
score = 0;
score = 4;
score = 11;
score = -1564;

// Reading from a Variable Does Not Change It
int e;
int f;

e = 5;
f = 2;

f = e;
e = -3;

Console.WriteLine(e); // -3
Console.WriteLine(f); // 5

// Clever Variable Tricks
int g = 0;
int h, i, j;
h = i = j = 10;

Console.WriteLine("h, i, j");
Console.WriteLine(h);
Console.WriteLine(i);
Console.WriteLine(j);

/* ------------------------
Level 6: The C# Type System
 * 
*/

// Declaring and Using Variables with Integer Types
byte aSingleByte = 34;
aSingleByte = 17;

short aNumber = 5038;
aNumber = -4354;

long aVeryBigNumber = 385904282568;
aVeryBigNumber = 13;

aVeryBigNumber = 10000000000; // 10 billion
ulong aVeryBigUNumber = 10000000000U; // U indicates number must be uint or ulong
aVeryBigUNumber = 10000000000L; // L indicates number must be long or ulong
aVeryBigUNumber = 10000000000UL; // UL indicates number but be ulong


// The Digit Separator
int bigNumber = 1_000_000_000;
int k = 123_456_789;
int l = 12_34_56_78_9;
int m = 1_2__3___4_____5;


// Binary and Hexadecimal Literals
int thirteen = 0b00001101;
int theColorMagenta = 0xFF00FF;


// Text: Characters and Strings
char aLetter = 'a';
char baseball = '⚾';

char anotherLetter = '\u0061'; // An 'a'

string message = "Hello World!";


// Floating-Point Types
double number1 = 3.5623;
float number2 = 3.5263f; // f for float
decimal number3 = 3.5263m; // m for money


// Scientific Notation
double avogadrosNumber = 6.022e23;


// The bool Type
bool itWorked = true;
itWorked = false;


// Challenge: The Variable Shop
sbyte anSbyte = -12;
byte aByte = 255;
short aShort = 3000;
ushort aUshort = 6000;
int anInt = 1_500_000_000;
uint aUint = 3_000_000_000;
long aLong = 821741324873412309;
ulong aUlong = 2349813275644013483;
float aFloat = 3.1456f;
double aDouble = 3.12531325313;
decimal aDecimal = 8.88888888m;
char aChar = 'z';
string aString = "zed";
bool aBool = true;

Console.WriteLine(anSbyte);


// Challenge: The Variable Shop Returns
anSbyte = -100;
aByte = 200;
aShort = 33;
aUshort = 2;
anInt = 333_333_333;
aUint = 2_444_444_444;
aLong = 55;
aUlong = 66;
aFloat = 1.111F;
aDouble = 10.000001;
aDecimal = 123.4567890M;
aChar = 'ㄱ';
aString = "This shit is the coolest string around.";
aBool = false;

Console.WriteLine(anSbyte);


// Type Inference
var aMessage = "Hello World!";

// var x; // DOES NOT COMPILE!

var input = Console.ReadLine(); // Confusing for programmer, even if computer can infer it without a problem

var something = "Hello"; // Implicitly assigns it string type
// something = 3; // ERROR! Cannot store an int in a string-typed variable.


// The Convert Class
Console.Write("What's your favorite number? >");
string faveNumString = Console.ReadLine();
int faveNum = Convert.ToInt32(faveNumString);
Console.Write(faveNum + " is a great number!");
