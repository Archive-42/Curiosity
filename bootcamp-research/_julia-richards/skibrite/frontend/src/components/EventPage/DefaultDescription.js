import React from "react";

const DefaultDescription = () => {
	return "For now use your best judgement on your ability level: Beginners can shuffle around, advanced skiers can move pretty fast, and intermediate skiers are in between. We are working on videos and better descriptions to help you determine your ability level in advance of the camp and will be refining our grouping remotely in advance of the event.  Stay tuned!\n\nWhat other changes can you expect in 2021?  The Members Clinic will be conducted completely outside this year and we will be organizing groups ahead of the clinic to avoid the big shuffle we usually orchestrate inside the morning of the clinic.  Skiers will want to be ready with a full change into dry clothing when we take a break to refuel and rehydrate at lunchtime.\n\nWe still plan to:\nHave one day of skate and one day of classic instruction as part of the clinic.  Which day is which will depend on the weather forecast for the weekend.\n\nWe will provide a basic bag lunch from the Mazama store featuring one of their delicious sandwiches on fresh-baked bread, some chips and a cookie.  You may want to supplement this basic lunch with snacks of your own.\n\nHave fun and learn a lot in one of the most beautiful places you can ski in North America!\n\nBe sure to read up on our expectations and protocols in the latest Return to Activity Plan for adult instruction at www.methowvalleynordic.com"
		.split("\n")
		.map((str, strIndex) => <p key={strIndex}>{str}</p>);
};

export default DefaultDescription;
