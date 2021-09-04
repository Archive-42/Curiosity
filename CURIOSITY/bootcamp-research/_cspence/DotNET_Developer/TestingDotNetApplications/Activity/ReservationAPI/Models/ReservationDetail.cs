using System;
using ReservationAPI.Services;

namespace ReservationAPI.Models
{
	public class ReservationDetail
	{
		public object From { get; internal set; }
		public object To { get; internal set; }
		public object ReservedByEmail { get; internal set; }
		public object ReservedBy { get; internal set; }
		public int AssetId { get; internal set; }
		public int Id { get; internal set; }
		public Asset Asset { get; internal set; }
		public DateTime FromDate { get; internal set; }
	}
}