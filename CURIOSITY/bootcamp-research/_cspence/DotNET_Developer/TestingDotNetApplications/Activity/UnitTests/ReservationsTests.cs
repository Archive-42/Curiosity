using System;
using ReservationAPI;
using ReservationAPI.Controllers;
using Xunit;

namespace UnitTests
{
	public class ReservationsTests
	{
		ReservationsController Controller { get; }

		[Fact]
		public void TestInit()
		{
			Assert.NotNull(Controller);
		}
	}
}
