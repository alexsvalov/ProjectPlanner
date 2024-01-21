using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Коэффициент постоянных расходов
/// </summary>
public partial class FixedCostRatio
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Дата начала действия
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Дата окончания действия
    /// </summary>
    public DateTime FinishDate { get; set; }

    /// <summary>
    /// Коэффициент постоянных расходов
    /// </summary>
    public decimal RatioNum { get; set; }
}
