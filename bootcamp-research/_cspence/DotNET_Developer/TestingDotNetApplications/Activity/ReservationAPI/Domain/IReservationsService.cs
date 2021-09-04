using System;
using System.Collections.Generic;
using ReservationAPI.Models;

namespace ReservationAPI.Domain
{
	public interface IReservationsService
	{
		IEnumerable<ReservationDetail> All();

		ReservationDetail GetById(int id);

		void Delete(int id);

		ValidationResult Add(ReservationDetail item);
		IEnumerable<ReservationDetail> GetAvailableItems(DateTime day);
		IEnumerable<ReservationDetail> Get(DateTime day, int assetId);
	}
}