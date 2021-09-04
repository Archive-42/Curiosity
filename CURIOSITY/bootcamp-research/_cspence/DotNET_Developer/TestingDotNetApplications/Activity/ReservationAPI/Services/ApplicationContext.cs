using System.Collections.Generic;
using ReservationAPI.Models;

namespace ReservationAPI.Services
{
	public class ApplicationContext
	{
		public ICollection<ReservationDetail> Reservations { get; }
		public ICollection<Asset> Assets { get; }
	}
}